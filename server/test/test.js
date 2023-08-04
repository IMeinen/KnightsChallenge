const { expect } = require("chai");
const chaiHttp = require("chai-http");
const chai = require("chai");
const app = require("../app");
const mongoose = require("mongoose");
const Knight = require("../src/models/Knights");

chai.use(chaiHttp);


describe("Knights API", () => {

  before((done) => {
    if (mongoose.connection.readyState === 0) {
      mongoose
        .connect("mongodb://localhost/test-db", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(() => done())
        .catch((err) => done(err));
    } else {
      done();
    }
  });

  after((done) => {
    mongoose
      .connection.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  beforeEach(async () => {
    await Knight.deleteMany({});
  });

  describe("GET /api/knights", () => {
    it("should get an empty array when there are no knights", (done) => {
      chai
        .request(app)
        .get("/api/knights")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an("array");
          expect(res.body.data).to.have.lengthOf(0);
          done();
        });
    });
  });

  describe("GET /api/knights?filter=heroes", () => {
    it("should get all the hero knights", (done) => {

      const heroKnights = [
        {
          name: "Sir Lancelot",
          nickname: "Lance",
          birthday: new Date("1985-05-15"),
          isHero: true,
          weapons: [
            { name: "Excalibur", mod: 5, attr: "strength", equipped: true },
            { name: "Bow", mod: 3, attr: "dexterity", equipped: false },
          ],
          attributes: {
            strength: 10,
            dexterity: 8,
            constitution: 9,
            intelligence: 5,
            wisdom: 6,
            charisma: 7,
          },
          keyAttribute: "strength",
        },
        {
          name: "Sir Galahad",
          nickname: "Gal",
          birthday: new Date("1990-10-20"),
          isHero: true,
          weapons: [
            { name: "Holy Lance", mod: 6, attr: "strength", equipped: true },
            { name: "Shield", mod: 2, attr: "constitution", equipped: true },
          ],
          attributes: {
            strength: 9,
            dexterity: 7,
            constitution: 8,
            intelligence: 6,
            wisdom: 5,
            charisma: 7,
          },
          keyAttribute: "strength",
        },
      ];

      Knight.insertMany(heroKnights)
      .then(() => {
        chai
          .request(app)
          .get("/api/knights?filter=heroes")
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an("array");
            expect(res.body.data).to.have.lengthOf(heroKnights.length);
            res.body.data.forEach((knight) => {
              expect(knight.isHero).to.be.true;
            });
            done(); // Move o done() para dentro deste callback
          });
      })
      .catch((error) => {
        done(error);
      });


     
      
    });
  });

  describe("GET /api/knights without filter", () => {
    it("should get all knights that are not heroes", (done) => {
      const knights = [
        {
          name: "Sir Lancelot",
          nickname: "Lance",
          birthday: new Date("1985-05-15"),
          isHero: false,
          weapons: [
            { name: "Excalibur", mod: 5, attr: "strength", equipped: true },
            { name: "Bow", mod: 3, attr: "dexterity", equipped: false },
          ],
          attributes: {
            strength: 10,
            dexterity: 8,
            constitution: 9,
            intelligence: 5,
            wisdom: 6,
            charisma: 7,
          },
          keyAttribute: "strength",
        },
        {
          name: "Sir Galahad",
          nickname: "Gal",
          birthday: new Date("1990-10-20"),
          isHero: false,
          weapons: [
            { name: "Holy Lance", mod: 6, attr: "strength", equipped: true },
            { name: "Shield", mod: 2, attr: "constitution", equipped: true },
          ],
          attributes: {
            strength: 9,
            dexterity: 7,
            constitution: 8,
            intelligence: 6,
            wisdom: 5,
            charisma: 7,
          },
          keyAttribute: "strength",
        },
      ];
      Knight.insertMany(knights)
        .then(() => {
          chai
            .request(app)
            .get("/api/knights")
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body.data).to.be.an("array");
              expect(res.body.data).to.have.lengthOf(knights.length);
              done();
            });
        })
        .catch((error) => {
          done(error);
        });
    });
  });

  describe("POST /api/knights when new character", () => {
    it("should create a new knight when no knight with the same name exists",  (done) => {
      const knightData = {
        name: "Sir Lancelot cssd",
        nickname: "Lance",
        birthday: new Date("1985-05-15"),
        isHero: true,
        weapons: [
          { name: "Excalibur", mod: 5, attr: "strength", equipped: true },
          { name: "Bow", mod: 3, attr: "dexterity", equipped: false },
        ],
        attributes: {
          strength: 10,
          dexterity: 8,
          constitution: 9,
          intelligence: 5,
          wisdom: 6,
          charisma: 7,
        },
        keyAttribute: "strength",
      };
      
      try {
        chai  
        .request(app)
        .post("/api/knights")
        .send(knightData)
        .end((err, res) => {
          
          expect(res).to.have.status(200);
          expect(res.body.data).to.be.an("object");
          expect(res.body.data.name).to.equal(knightData.name);
          expect(res.body.data.nickname).to.equal(knightData.nickname);
          done();
        });     
      } catch (error) {
        done();
        expect.fail("Should not throw an error");
      }
    });
  });

  describe("POST /api/knights when knight already exists", () => {
    it("should throw an error when trying to create a knight with an existing name", (done) => {
      
      const existingKnight = {
        name: "Sir Lancelot Existing",
        nickname: "Lance",
        birthday: new Date("1985-05-15"),
        isHero: true,
        weapons: [
          { name: "Excalibur", mod: 5, attr: "strength", equipped: true },
          { name: "Bow", mod: 3, attr: "dexterity", equipped: false },
        ],
        attributes: {
          strength: 10,
          dexterity: 8,
          constitution: 9,
          intelligence: 5,
          wisdom: 6,
          charisma: 7,
        },
        keyAttribute: "strength",
      };
      Knight.insertMany([existingKnight]).then(() => {
        chai
        .request(app)
        .post("/api/knights")
        .send(existingKnight)
        .end((err, res) => {
          expect(res).to.have.status(500); 
          expect(res.body.error).to.equal("Knight já registrado");
          done();
        });
      }) 
    });
  });

  describe("GET /api/knights/:id with invalid ID format", () => {
    it("should throw an error when the ID format is invalid", (done) => {
      const invalidId = "invalid-id"; // ID inválido, não corresponde ao formato esperado
  
      chai
        .request(app)
        .get(`/api/knights/${invalidId}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Formato do id invalido");
          done();
        });
    });
  });

  describe("GET /api/knights/:id with non-existing ID", () => {
    it("should throw an error when no knight is found with that ID", (done) => {
      const nonExistingId = "5feda9f2c8b8a509d84d10e1"; // ID que não existe no banco de dados
  
      chai
        .request(app)
        .get(`/api/knights/${nonExistingId}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Nenhum Knight encontrado com esse id");
          done();
        });
    });
  });
  
  describe("GET /api/knights/:id with existing ID", () => {
    it("should return the knight when the correct ID is provided", (done) => {
      // Primeiro, criamos um cavaleiro para ter um ID existente no banco de dados
      const knightData = {
        name: "Sir Galahad",
        nickname: "Gal",
        birthday: new Date("1990-10-20"),
        isHero: false,
        weapons: [
          { name: "Holy Lance", mod: 6, attr: "strength", equipped: true },
          { name: "Shield", mod: 2, attr: "constitution", equipped: true },
        ],
        attributes: {
          strength: 9,
          dexterity: 7,
          constitution: 8,
          intelligence: 6,
          wisdom: 5,
          charisma: 7,
        },
        keyAttribute: "strength",
      };
  
      Knight.create(knightData).then((createdKnight) => {
    
        chai
          .request(app)
          .get(`/api/knights/${JSON.parse(JSON.stringify(createdKnight._id))}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an("object");
            expect(res.body.data._id).to.equal(createdKnight._id.toString());
            done();
          });
      });
    });
  });
  
  describe("PUT /api/knights/:id with invalid ID format", () => {
    it("should throw an error when the ID format is invalid", (done) => {
      const invalidId = "invalid-id";
      const updatedData = {
        nickName: "Updated Nickname",
      };
  
      chai
        .request(app)
        .put(`/api/knights/${invalidId}`)
        .send(updatedData)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Formato do id invalido");
          done();
        });
    });
  });
  
  describe("PUT /api/knights/:id with non-existing ID", () => {
    it("should throw an error when no knight is found with that ID", (done) => {
      const nonExistingId = "5feda9f2c8b8a509d84d10e1";
      const updatedData = {
        nickName: "Updated Nickname",
      };
  
      chai
        .request(app)
        .put(`/api/knights/${nonExistingId}`)
        .send(updatedData)
        .end((err, res) => {
          
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Nenhum Knight encontrado com esse id");
          done();
        });
    });
  });

  describe("PUT /api/knights/:id with existing ID", () => {
    it("should update the knight when the correct ID is provided", (done) => {
      const knightData = {
        name: "Sir Galahad",
        nickname: "Gal",
        birthday: new Date("1990-10-20"),
        isHero: false,
        weapons: [
          { name: "Holy Lance", mod: 6, attr: "strength", equipped: true },
          { name: "Shield", mod: 2, attr: "constitution", equipped: true },
        ],
        attributes: {
          strength: 9,
          dexterity: 7,
          constitution: 8,
          intelligence: 6,
          wisdom: 5,
          charisma: 7,
        },
        keyAttribute: "strength",
      };
  
      Knight.create(knightData).then((createdKnight) => {
        const updatedData = {
          nickname: "Updated Nickname",
        };
        
        chai
          .request(app)
          .put(`/api/knights/${JSON.parse(JSON.stringify(createdKnight._id))}`)
          .send(updatedData)
          .end((err, res) => {
            
            
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an("object");
            expect(res.body.data._id).to.equal(JSON.parse(JSON.stringify(createdKnight._id)));
            expect(res.body.data.nickname).to.equal(updatedData.nickname);
            done();
          });
      });
    });
  });

  describe("DELETE /api/knights/:id with invalid ID format", () => {
    it("should throw an error when the ID format is invalid", (done) => {
      const invalidId = "invalid-id"; // ID inválido, não corresponde ao formato esperado
  
      chai
        .request(app)
        .delete(`/api/knights/${invalidId}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Formato do id invalido");
          done();
        });
    });
  });

  describe("DELETE /api/knights/:id with non-existing ID", () => {
    it("should throw an error when no knight is found with that ID", (done) => {
      const nonExistingId = "5feda9f2c8b8a509d84d10e1";
  
      chai
        .request(app)
        .delete(`/api/knights/${nonExistingId}`)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.error).to.equal("Nenhum Knight encontrado com esse id");
          done();
        });
    });
  });

  describe("DELETE /api/knights/:id with existing ID", () => {
    it("should delete the knight when the correct ID is provided", (done) => {

      const knightData = {
        name: "Sir Galahad",
        nickname: "Gal",
        birthday: new Date("1990-10-20"),
        isHero: false,
        weapons: [
          { name: "Holy Lance", mod: 6, attr: "strength", equipped: true },
          { name: "Shield", mod: 2, attr: "constitution", equipped: true },
        ],
        attributes: {
          strength: 9,
          dexterity: 7,
          constitution: 8,
          intelligence: 6,
          wisdom: 5,
          charisma: 7,
        },
        keyAttribute: "strength",
      };
  
      Knight.create(knightData).then((createdKnight) => {
        chai
          .request(app)
          .delete(`/api/knights/${JSON.parse(JSON.stringify(createdKnight._id))}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.data).to.be.an("object");
            expect(res.body.data.message).to.equal("O knight virou um herói agora!");
            done();
          });
      });
    });
  });
});