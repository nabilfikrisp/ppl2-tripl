const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const Plan = require('../models/plan');
const { MONGODB_URI } = require('../utils/config');

const api = supertest(app);

beforeAll(() => {
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

const formattedDate = (dateInput) =>
  new Date(dateInput).toISOString().split('T')[0];

let seedLocations;
let jwtToken;

beforeAll(async () => {
  await api.post('/api/auth/register').send({
    email: 'planapi@gmail.com',
    name: 'plan',
    password: 'password123',
  });

  const locations = await api.get('/api/locations?page=1&pageSize=2');

  seedLocations = locations.body.map((location) => ({
    location: location.id,
    timeRange: '11:00-12:00',
  }));

  const loginResponse = await api
    .post('/api/auth/login')
    .send({
      email: 'planapi@gmail.com',
      password: 'password123',
    })
    .expect(200);

  jwtToken = loginResponse.body.token;
});

describe('Plan Creation API', () => {
  test('POST /api/plans should create a plan', async () => {
    const newPlanData = {
      date: '2023-12-01',
      title: 'Test Plan',
      description: 'This is a test plan',
      locations: seedLocations,
    };

    const response = await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newPlanData)
      .expect(201);

    const createdPlan = await Plan.findById(response.body.id);
    expect(createdPlan.title).toBe(newPlanData.title);
    expect(formattedDate(createdPlan.date)).toBe(
      formattedDate(newPlanData.date)
    );
  });

  test('POST /api/plans with missing params should return 400', async () => {
    const noDatePlanData = {
      title: 'Test Plan',
      description: 'This is a test plan',
      locations: seedLocations,
    };

    const noTitlePlanData = {
      date: '2023-12-01',
      description: 'This is a test plan',
      locations: seedLocations,
    };

    await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(noDatePlanData)
      .expect(400);

    await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(noTitlePlanData)
      .expect(400);
  });
});

describe('Plan API', () => {
  test('GET /api/plans should return all plans without creator details', async () => {
    const response = await api.get('/api/plans').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/plans should return all plans with creator details if includeCreator is set', async () => {
    const response = await api
      .get('/api/plans?includeCreator=true')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].creator).toBeDefined();
  });

  test('GET /api/plans should return all plans with creator details if includeLocations is set', async () => {
    const response = await api
      .get('/api/plans?includeLocations=true')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].locations).toBeDefined();
  });

  test('GET /api/plans/me should return logged in user plans', async () => {
    const response = await api
      .get('/api/plans/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/plans/me should return logged in user plans with includeCreator', async () => {
    const response = await api
      .get('/api/plans/me/?includeCreator=true')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].creator.email).toBe('planapi@gmail.com');
  });

  test('GET /api/plans/me should return logged in user plans with includeLocations', async () => {
    const response = await api
      .get('/api/plans/me/?includeLocations=true')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0].locations).toBeDefined();
  });
});

describe('Plan Detail API', () => {
  let validPlanId;
  let nonExistentPlanId;
  beforeAll(async () => {
    const newPlanData = {
      date: '2023-12-02',
      title: 'Test Plan2',
      description: 'This is a test plan2',
      locations: seedLocations,
    };

    await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newPlanData)
      .expect(201);

    const response = await api
      .get('/api/plans/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    const myPlans = response.body;
    validPlanId = myPlans[0].id;
    nonExistentPlanId = 'nonExistentPlanId';
  });

  test('GET /api/plans/:id should return plan details', async () => {
    const response = await api.get(`/api/plans/${validPlanId}`).expect(200);

    expect(response.body).toBeDefined();
  });

  test('GET /api/plans/:id should return plan details with creator if includeCreator query is set', async () => {
    const response = await api
      .get(`/api/plans/${validPlanId}?includeCreator=true`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.creator).toBeDefined();
  });
  test('GET /api/plans/:id should return plan details with creator if includeLocations query is set', async () => {
    const response = await api
      .get(`/api/plans/${validPlanId}?includeLocations=true`)
      .expect(200);

    expect(response.body).toBeDefined();
    expect(response.body.locations[0].location).toBeDefined();
  });

  test('GET /api/plans/:id should return 404 if plan is not found', async () => {
    await api.get(`/api/plans/${nonExistentPlanId}`).expect(404);
  });

  test('GET /api/plans/:id should return 404 if plan is not found with randomId', async () => {
    const randomId = `${validPlanId.slice(0, -5)}fffff`;
    await api.get(`/api/plans/${randomId}`).expect(404);
  });
});

describe('Plan Update API', () => {
  let initialPlanId;
  let updateSeedLocations;
  beforeAll(async () => {
    const newPlanData = {
      date: '2023-12-02',
      title: 'Test Plan2',
      description: 'This is a test plan2',
      locations: seedLocations,
    };

    await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newPlanData)
      .expect(201);

    const response = await api
      .get('/api/plans/me')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);

    const myPlans = response.body;
    initialPlanId = myPlans[0].id;

    const locations = await api.get('/api/locations?page=1&pageSize=3');
    updateSeedLocations = locations.body
      .slice(1, 3)
      .map((location) => ({ location: location.id, timeRange: '11:00-13:00' }));
  });
  test('PUT /api/plans/:id should update the plans', async () => {
    const updatePlanData = {
      date: '2023-12-03',
      title: 'Test Plan3',
      description: 'This is a test plan3',
      locations: updateSeedLocations,
    };

    await api
      .put(`/api/plans/${initialPlanId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updatePlanData)
      .expect(200);

    const detailResponse = await api
      .get(`/api/plans/${initialPlanId}`)
      .expect(200);

    expect(detailResponse.body.title).toBe(updatePlanData.title);
    expect(formattedDate(detailResponse.body.date)).toBe(
      formattedDate(updatePlanData.date)
    );
    expect(detailResponse.body.description).toBe(updatePlanData.description);
    expect(detailResponse.body.locations[0].location).toBe(
      updatePlanData.locations[0].location
    );
  });

  test('PUT /api/plans/:id with wrong creator should be unathorized', async () => {
    await api.post('/api/auth/register').send({
      email: 'planapi2@gmail.com',
      name: 'plan2',
      password: 'password123',
    });
    const newLoginResponse = await api
      .post('/api/auth/login')
      .send({
        email: 'planapi2@gmail.com',
        password: 'password123',
      })
      .expect(200);

    const newJwtToken = newLoginResponse.body.token;

    const updatePlanData = {
      date: '2023-12-04',
      title: 'Test Plan4',
      description: 'This is a test plan3',
      locations: updateSeedLocations,
    };

    await api
      .put(`/api/plans/${initialPlanId}`)
      .set('Authorization', `Bearer ${newJwtToken}`)
      .send(updatePlanData)
      .expect(401);
  });

  test('PUT /api/plans/:id with wrong plan id should return 400', async () => {
    const updatePlanData = {
      date: '2023-12-03',
      title: 'Test Plan3',
      description: 'This is a test plan3',
      locations: updateSeedLocations,
    };
    const wrongPlanId = `${initialPlanId.slice(0, -3)}fff`;
    await api
      .put(`/api/plans/${wrongPlanId}`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updatePlanData)
      .expect(404);
    await api
      .put(`/api/plans/asdfsadfsa`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(updatePlanData)
      .expect(404);
  });
});

describe('Plan Delete API', () => {
  let initialDeletedId;
  beforeEach(async () => {
    const newPlanData = {
      date: '2023-12-01',
      title: 'Test Plan',
      description: 'This is a test plan',
      locations: seedLocations,
    };

    const postReponse = await api
      .post('/api/plans')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(newPlanData)
      .expect(201);

    initialDeletedId = postReponse.body.id;
  });
  test('DELETE /api/plans/:id should delete a plan and return 204 status', async () => {
    const response = await api
      .delete(`/api/plans/${initialDeletedId}`)
      .set('Authorization', `Bearer ${jwtToken}`);

    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  test('DELETE /api/plans/:id with wrong id or malformatted id', async () => {
    await api
      .delete(`/api/plans/${initialDeletedId.slice(0, -3)}fff`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);

    await api
      .delete(`/api/plans/randomid`)
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(404);
  });
  test('DELETE /api/plans/:id with unathorized user', async () => {
    await api
      .post('/api/auth/register')
      .send({
        email: 'deletePlan@gmail.com',
        name: 'unit',
        password: 'password123',
      })
      .expect(201);

    const loginResponse = await api
      .post('/api/auth/login')
      .send({
        email: 'deletePlan@gmail.com',
        password: 'password123',
      })
      .expect(200);

    const response = await api
      .delete(`/api/plans/${initialDeletedId}`)
      .set('Authorization', `Bearer ${loginResponse.body.token}`);

    expect(response.status).toBe(401);
  });
});

afterAll(async () => {
  await Plan.collection.drop();
  await User.collection.drop();
  await mongoose.connection.close();
});
