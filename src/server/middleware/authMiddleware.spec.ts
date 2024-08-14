import request from 'supertest';
import { Server } from 'http';
import fetch from 'isomorphic-fetch';
import jwt from 'jsonwebtoken';

import { startServer } from '../server';

jest.mock('isomorphic-fetch');

describe('authMiddleware', () => {
  let server: Server;

  beforeEach(() => {
    server = startServer();
  });

  afterEach(() => {
    server.close();
  });

  describe('/auth/invite', () => {
    const token = jwt.sign(
      {
        email: 'test@test.com',
      },
      'secret',
      { expiresIn: '200d' }
    );

    const expiredToken = jwt.sign(
      {
        email: 'test@test.com',
      },
      'secret',
      { expiresIn: '0s' }
    );

    describe('when a valid token is provided', () => {
      it('should redirect to /handle-invitation', (done) => {
        expect.assertions(1);

        ((fetch as unknown) as jest.Mock).mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            isJWTValid: true,
          }),
          ok: true,
        });

        request(server)
          .get(`/auth/invite?inviteToken=${token}`)
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.headers.location).toContain('/handle-invitation');
            return done();
          });
      });
    });

    describe('when an expired token is provided', () => {
      it('should redirect to /invite-expired', (done) => {
        expect.assertions(1);

        request(server)
          .get(`/auth/invite?inviteToken=${expiredToken}`)
          .expect(302)
          .end((_, res) => {
            expect(res.headers.location).toContain('/invite-expired');
            return done();
          });
      });
    });

    describe('when an invalid token is provided', () => {
      it('should redirect to /forbidden', (done) => {
        expect.assertions(1);

        ((fetch as unknown) as jest.Mock).mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            status: 401,
            message: 'Invalid',
          }),
          ok: false,
        });

        request(server)
          .get(`/auth/invite?inviteToken=${token}`)
          .expect(302)
          .end((err, res) => {
            if (err) {
              return done(err);
            }

            expect(res.headers.location).toContain('/forbidden');
            return done();
          });
      });
    });
  });
});
