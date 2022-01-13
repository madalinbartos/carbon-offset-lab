import { MigrationInterface, QueryRunner } from 'typeorm';

export class MockUsers1645802109321 implements MigrationInterface {
  name = 'MockUsers1645802109321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      insert into "user" (name, username, email, "passwordHash") values ('Peta Rosnau', 'prosnau0', 'prosnau0@yale.edu', 'CudmfnZ1Zg');
      insert into "user" (name, username, email, "passwordHash") values ('Brear Willson', 'bwillson1', 'bwillson1@ehow.com', 'LOjiuz1');
      insert into "user" (name, username, email, "passwordHash") values ('Lay Kerans', 'lkerans2', 'lkerans2@google.it', 'sGmZRT');
      insert into "user" (name, username, email, "passwordHash") values ('Domini Akester', 'dakester3', 'dakester3@youtu.be', 'eTTmt1Rsp');
      insert into "user" (name, username, email, "passwordHash") values ('Cordelia Pieper', 'cpieper4', 'cpieper4@merriam-webster.com', 'wjx7Rrr');
      insert into "user" (name, username, email, "passwordHash") values ('Abbye Alennikov', 'aalennikov5', 'aalennikov5@cloudflare.com', 'mRA6NLZ2uW');
      insert into "user" (name, username, email, "passwordHash") values ('Dottie Hibling', 'dhibling6', 'dhibling6@phpbb.com', 'MvwIDjnR');
      insert into "user" (name, username, email, "passwordHash") values ('Peder Camm', 'pcamm7', 'pcamm7@toplist.cz', 'T0glP1OfbAr');
      insert into "user" (name, username, email, "passwordHash") values ('Pippy Spere', 'pspere8', 'pspere8@noaa.gov', 'McoAEuaL2Kw');
      insert into "user" (name, username, email, "passwordHash") values ('Ethelin Grigoli', 'egrigoli9', 'egrigoli9@accuweather.com', 'XicGwA');
      insert into "user" (name, username, email, "passwordHash") values ('Lyssa Streeting', 'lstreetinga', 'lstreetinga@dot.gov', 'sU5E8X1t6m');
      insert into "user" (name, username, email, "passwordHash") values ('Lelah Venning', 'lvenningb', 'lvenningb@unesco.org', 'IrgQLh');
      insert into "user" (name, username, email, "passwordHash") values ('Grace Tivenan', 'gtivenanc', 'gtivenanc@yale.edu', 'I9LKMm9dL');
      insert into "user" (name, username, email, "passwordHash") values ('Milton Leathlay', 'mleathlayd', 'mleathlayd@howstuffworks.com', 'm7VK34iE');
      insert into "user" (name, username, email, "passwordHash") values ('Tiffani Malan', 'tmalane', 'tmalane@biblegateway.com', '7J19sDIwGv');
      insert into "user" (name, username, email, "passwordHash") values ('Isa Sawden', 'isawdenf', 'isawdenf@t-online.de', 'G9KwrrG7iE');
      insert into "user" (name, username, email, "passwordHash") values ('Livia Finlry', 'lfinlryg', 'lfinlryg@freewebs.com', 'ayNTDHCv');
      insert into "user" (name, username, email, "passwordHash") values ('Mimi Daymond', 'mdaymondh', 'mdaymondh@bigcartel.com', '1y8r1v1');
      insert into "user" (name, username, email, "passwordHash") values ('Chastity Redhills', 'credhillsi', 'credhillsi@zdnet.com', 'NfCvPMBkbRw');
      insert into "user" (name, username, email, "passwordHash") values ('Elicia Wickham', 'ewickhamj', 'ewickhamj@marriott.com', 'mym1AV667HI');
    `);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_: QueryRunner): Promise<void> {}
}
