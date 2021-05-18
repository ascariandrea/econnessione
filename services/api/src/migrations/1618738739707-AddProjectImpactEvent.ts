import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProjectImpactEvent1618738739707 implements MigrationInterface {
  name = "AddProjectImpactEvent1618738739707";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "project_impact" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "impact" text NOT NULL, "startDate" TIMESTAMP WITH TIME ZONE NOT NULL, "endDate" TIMESTAMP WITH TIME ZONE, "location" json, "body" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a672f1d7598fbef862076dcd6a4" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a672f1d7598fbef862076dcd6a" ON "project_impact" ("id") `
    );
    await queryRunner.query(
      `CREATE TABLE "project_impact_images_image" ("projectImpactId" uuid NOT NULL, "imageId" uuid NOT NULL, CONSTRAINT "PK_1c441c9d5c1201ac57ed8ec7d25" PRIMARY KEY ("projectImpactId", "imageId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7db25c44d4f37e87e057e9767f" ON "project_impact_images_image" ("projectImpactId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b6f3500a26074020f2d672433e" ON "project_impact_images_image" ("imageId") `
    );
    await queryRunner.query(
      `CREATE TABLE "project_impact_groups_group" ("projectImpactId" uuid NOT NULL, "groupId" uuid NOT NULL, CONSTRAINT "PK_60f18750fc2210e5b518c956b07" PRIMARY KEY ("projectImpactId", "groupId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3df755375dfcde0c03c3b2d4ac" ON "project_impact_groups_group" ("projectImpactId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0a4f46f7ec2943da861824991" ON "project_impact_groups_group" ("groupId") `
    );
    await queryRunner.query(
      `CREATE TABLE "project_impact_actors_actor" ("projectImpactId" uuid NOT NULL, "actorId" uuid NOT NULL, CONSTRAINT "PK_e6338d9abaa4a49e1690eb79a56" PRIMARY KEY ("projectImpactId", "actorId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_408566e959a48e4c78d09e81e7" ON "project_impact_actors_actor" ("projectImpactId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1880babd4584f29287c77ef61b" ON "project_impact_actors_actor" ("actorId") `
    );
    await queryRunner.query(
      `CREATE TABLE "project_impact_groups_members_group_member" ("projectImpactId" uuid NOT NULL, "groupMemberId" uuid NOT NULL, CONSTRAINT "PK_a6903eeba44e31c8162cd63c544" PRIMARY KEY ("projectImpactId", "groupMemberId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c3e453943560276fdcc0067701" ON "project_impact_groups_members_group_member" ("projectImpactId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_21198c7b725ca5341c756ddc80" ON "project_impact_groups_members_group_member" ("groupMemberId") `
    );
    await queryRunner.query(
      `CREATE TABLE "project_impacts_project_impact" ("projectId" uuid NOT NULL, "projectImpactId" uuid NOT NULL, CONSTRAINT "PK_193f408dd9a649b56ee6d1eeca0" PRIMARY KEY ("projectId", "projectImpactId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_96b6ad3955d193b85beb1a9cb9" ON "project_impacts_project_impact" ("projectId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b7543d64d125b7554d59d6b4f6" ON "project_impacts_project_impact" ("projectImpactId") `
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_images_image" ADD CONSTRAINT "FK_7db25c44d4f37e87e057e9767f8" FOREIGN KEY ("projectImpactId") REFERENCES "project_impact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_images_image" ADD CONSTRAINT "FK_b6f3500a26074020f2d672433e0" FOREIGN KEY ("imageId") REFERENCES "image"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_group" ADD CONSTRAINT "FK_3df755375dfcde0c03c3b2d4ac0" FOREIGN KEY ("projectImpactId") REFERENCES "project_impact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_group" ADD CONSTRAINT "FK_d0a4f46f7ec2943da861824991b" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_actors_actor" ADD CONSTRAINT "FK_408566e959a48e4c78d09e81e7e" FOREIGN KEY ("projectImpactId") REFERENCES "project_impact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_actors_actor" ADD CONSTRAINT "FK_1880babd4584f29287c77ef61bb" FOREIGN KEY ("actorId") REFERENCES "actor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_members_group_member" ADD CONSTRAINT "FK_c3e453943560276fdcc0067701c" FOREIGN KEY ("projectImpactId") REFERENCES "project_impact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_members_group_member" ADD CONSTRAINT "FK_21198c7b725ca5341c756ddc80d" FOREIGN KEY ("groupMemberId") REFERENCES "group_member"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impacts_project_impact" ADD CONSTRAINT "FK_96b6ad3955d193b85beb1a9cb97" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impacts_project_impact" ADD CONSTRAINT "FK_b7543d64d125b7554d59d6b4f64" FOREIGN KEY ("projectImpactId") REFERENCES "project_impact"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "project_impacts_project_impact" DROP CONSTRAINT "FK_b7543d64d125b7554d59d6b4f64"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impacts_project_impact" DROP CONSTRAINT "FK_96b6ad3955d193b85beb1a9cb97"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_members_group_member" DROP CONSTRAINT "FK_21198c7b725ca5341c756ddc80d"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_members_group_member" DROP CONSTRAINT "FK_c3e453943560276fdcc0067701c"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_actors_actor" DROP CONSTRAINT "FK_1880babd4584f29287c77ef61bb"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_actors_actor" DROP CONSTRAINT "FK_408566e959a48e4c78d09e81e7e"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_group" DROP CONSTRAINT "FK_d0a4f46f7ec2943da861824991b"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_groups_group" DROP CONSTRAINT "FK_3df755375dfcde0c03c3b2d4ac0"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_images_image" DROP CONSTRAINT "FK_b6f3500a26074020f2d672433e0"`
    );
    await queryRunner.query(
      `ALTER TABLE "project_impact_images_image" DROP CONSTRAINT "FK_7db25c44d4f37e87e057e9767f8"`
    );
    await queryRunner.query(`DROP INDEX "IDX_b7543d64d125b7554d59d6b4f6"`);
    await queryRunner.query(`DROP INDEX "IDX_96b6ad3955d193b85beb1a9cb9"`);
    await queryRunner.query(`DROP TABLE "project_impacts_project_impact"`);
    await queryRunner.query(`DROP INDEX "IDX_21198c7b725ca5341c756ddc80"`);
    await queryRunner.query(`DROP INDEX "IDX_c3e453943560276fdcc0067701"`);
    await queryRunner.query(
      `DROP TABLE "project_impact_groups_members_group_member"`
    );
    await queryRunner.query(`DROP INDEX "IDX_1880babd4584f29287c77ef61b"`);
    await queryRunner.query(`DROP INDEX "IDX_408566e959a48e4c78d09e81e7"`);
    await queryRunner.query(`DROP TABLE "project_impact_actors_actor"`);
    await queryRunner.query(`DROP INDEX "IDX_d0a4f46f7ec2943da861824991"`);
    await queryRunner.query(`DROP INDEX "IDX_3df755375dfcde0c03c3b2d4ac"`);
    await queryRunner.query(`DROP TABLE "project_impact_groups_group"`);
    await queryRunner.query(`DROP INDEX "IDX_b6f3500a26074020f2d672433e"`);
    await queryRunner.query(`DROP INDEX "IDX_7db25c44d4f37e87e057e9767f"`);
    await queryRunner.query(`DROP TABLE "project_impact_images_image"`);
    await queryRunner.query(`DROP INDEX "IDX_a672f1d7598fbef862076dcd6a"`);
    await queryRunner.query(`DROP TABLE "project_impact"`);
  }
}
