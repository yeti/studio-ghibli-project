import { createTestContext, TestContext } from './__helpers';

describe('Studio Ghibli GraphQL Endpoints', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await createTestContext();
  });

  afterAll(async () => {
    await context.stopServer();
  });

  describe('film query', () => {
    it('should fetch a single film by ID', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
            description
            director
            release_date
            running_time
            rt_score
          }
        }
      `;

      const variables = {
        id: 'ebbb6b7c-945c-41ee-a792-de0e43191bd8', // Porco Rosso
      };

      const response = await context.request
        .post('/graphql')
        .send({
          query,
          variables,
        })
        .expect(200);

      expect(response.body.data.film).toBeDefined();
      expect(response.body.data.film.id).toBe(variables.id);
      expect(response.body.data.film.title).toBe('Porco Rosso');
      expect(response.body.data.film.director).toBe('Hayao Miyazaki');
    });

    it('should return null for non-existent film ID', async () => {
      const query = `
        query GetFilm($id: String!) {
          film(id: $id) {
            id
            title
          }
        }
      `;

      const variables = {
        id: 'non-existent-id',
      };

      const response = await context.request
        .post('/graphql')
        .send({
          query,
          variables,
        })
        .expect(200);

      expect(response.body.data.film).toBeNull();
    });
  });

  describe('films query', () => {
    it('should fetch all films', async () => {
      const query = `
        query GetAllFilms {
          films {
            id
            title
            director
            release_date
            running_time
            rt_score
          }
        }
      `;

      const response = await context.request
        .post('/graphql')
        .send({
          query,
        })
        .expect(200);

      expect(response.body.data.films).toBeDefined();
      expect(Array.isArray(response.body.data.films)).toBe(true);
      expect(response.body.data.films.length).toBeGreaterThan(0);

      // Check that we have the expected films
      const filmTitles = response.body.data.films.map(
        (film: any) => film.title,
      );
      expect(filmTitles).toContain('Porco Rosso');
      expect(filmTitles).toContain("Kiki's Delivery Service");
      expect(filmTitles).toContain("Howl's Moving Castle");
      expect(filmTitles).toContain('My Neighbor Totoro');
    });

    it('should return films with all required fields', async () => {
      const query = `
        query GetAllFilms {
          films {
            id
            title
            original_title
            original_title_romanised
            description
            director
            producer
            release_date
            running_time
            rt_score
            people
            species
            locations
            vehicles
            url
          }
        }
      `;

      const response = await context.request
        .post('/graphql')
        .send({
          query,
        })
        .expect(200);

      const films = response.body.data.films;
      expect(films.length).toBeGreaterThan(0);

      // Check that the first film has all required fields
      const firstFilm = films[0];
      expect(firstFilm.id).toBeDefined();
      expect(firstFilm.title).toBeDefined();
      expect(firstFilm.description).toBeDefined();
      expect(firstFilm.director).toBeDefined();
      expect(firstFilm.release_date).toBeDefined();
      expect(firstFilm.running_time).toBeDefined();
      expect(firstFilm.rt_score).toBeDefined();
      expect(firstFilm.url).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should handle malformed queries gracefully', async () => {
      const malformedQuery = `
        query {
          film {
            nonExistentField
          }
        }
      `;

      const response = await context.request
        .post('/graphql')
        .send({
          query: malformedQuery,
        })
        .expect(400);

      expect(response.body.errors).toBeDefined();
    });
  });
});
