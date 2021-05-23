import * as http from "@econnessione/shared/io/http";
import jwt from "jsonwebtoken";
import { fc } from "@econnessione/core/tests";
import { AppTest, initAppTest } from "../../../../test/AppTest";
import { EventArb } from "@econnessione/shared/tests/arbitrary/Event.arbitrary";
import { ProjectArb } from "@econnessione/shared/tests/arbitrary/Project.arbitrary";
import { ProjectImpactEventArb } from "@econnessione/shared/tests/arbitrary/ProjectImpactEvent.arbitrary";
import { EventEntity } from "../../../entities/Event.entity";
import { ProjectImpactEventEntity } from "../../../entities/ProjectImpactEvent.entity";
import { ProjectEntity } from "../../../entities/Project.entity";
import * as t from "io-ts";
import * as E from "fp-ts/lib/Either";

describe("Get Events", () => {
  let appTest: AppTest, authorizationToken: string;

  const eventData = fc.sample(
      EventArb.map((e) => ({
        ...e,
        images: [],
        links: [],
        topics: [],
        groups: [],
        actors: [],
        groupsMembers: [],
      })),
      5
    ),
    project = fc.sample(ProjectArb, 1)[0],
    projectImpacts = fc.sample(
      ProjectImpactEventArb.map((e) => ({
        ...e,
        project: project.id,
      })),
      5
    );
  beforeAll(async () => {
    appTest = await initAppTest();

    authorizationToken = `Bearer ${jwt.sign(
      { id: "1" },
      appTest.ctx.env.JWT_SECRET
    )}`;

    await appTest.ctx.db.save(ProjectEntity, [project] as any[])();
    await appTest.ctx.db.save(EventEntity, eventData as any[])();
    await appTest.ctx.db.save(
      ProjectImpactEventEntity,
      projectImpacts as any[]
    )();
  });

  afterAll(async () => {
    await appTest.ctx.db.delete(
      EventEntity,
      eventData.map((e) => e.id) as any[]
    )();
    await appTest.ctx.db.delete(
      ProjectImpactEventEntity,
      eventData.map((e) => e.id) as any[]
    )();
    await appTest.ctx.db.close()();
  });

  test("Should list `uncategorized` events", async () => {
    const response = await appTest.req
      .get(`/v1/events`)
      .set("Authorization", authorizationToken);

    const body = response.body.data;

    const decodedBody = t
      .array(http.Events.Uncategorized.Uncategorized)
      .decode(body);

    expect(response.status).toEqual(200);
    expect(E.isRight(decodedBody)).toBe(true);
  });

  test("Should list also project impact events", async () => {
    const response = await appTest.req
      .get(`/v1/events`)
      .query({ type: "ProjectImpact" })
      .set("Authorization", authorizationToken);

    const body = response.body.data;

    const decodedBody = t.array(http.Events.ProjectImpact).decode(body);

    expect(response.status).toEqual(200);
    expect(E.isRight(decodedBody)).toBe(true);
  });

  test.todo("Should create an event with images");
  test.todo("Should create an event with groups");
  test.todo("Should create an event with actors");
  test.todo("Should create an event with group members");
});
