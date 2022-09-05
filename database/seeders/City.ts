import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import City from "App/Models/City";

export default class extends BaseSeeder {
  public async run() {
    await City.createMany([
      {
        name: "Foix",
        code: "09122",
        code_departement: "09",
        code_region: "76",
        codes_postaux: '["09000"]',
        population: 9493,
      },
      {
        name: "Foëcy",
        code: "18096",
        code_departement: "18",
        code_region: "24",
        codes_postaux: '["18500"]',
        population: 2099,
      },
      {
        name: "Foce",
        code: "2A115",
        code_departement: "2A",
        code_region: "94",
        codes_postaux: '["20100"]',
        population: 150,
      },
      {
        name: "Fouju",
        code: "77195",
        code_departement: "77",
        code_region: "11",
        codes_postaux: '["77390"]',
        population: 575,
      },
    ]);
  }
}
