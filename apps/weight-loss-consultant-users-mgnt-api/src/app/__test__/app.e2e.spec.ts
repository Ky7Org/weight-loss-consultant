import {INestApplication} from "@nestjs/common";
import {Test, TestingModule} from "@nestjs/testing";
import {GRPC_ADMIN_SERVICE, USERS_MANAGEMENT_GRPC_SERVICE_NAME} from "../../../../common/grpc-services.route";
import {ClientGrpc, ClientsModule, Transport} from "@nestjs/microservices";
import {AdminService} from "../../../../common/proto-models/users-mgnt.proto";

describe('App (e2e)', () => {
  let app: INestApplication;
  let client: ClientGrpc;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: USERS_MANAGEMENT_GRPC_SERVICE_NAME,
            options: {
              transport: Transport.GRPC,

            }
          }
        ])
      ],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.GRPC,
    });
    await app.startAllMicroservices();
    await app.init();

    client = app.get(USERS_MANAGEMENT_GRPC_SERVICE_NAME);
    await client.getService<AdminService>(GRPC_ADMIN_SERVICE);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AdminModule', () => {
    beforeEach(async () => {
      console.log(app.getMicroservices());

      //const uncleared = await request((app.getMicroservices()))
    });
    it('test', () => {
      expect('1').toEqual('1');
    })
  });
});
