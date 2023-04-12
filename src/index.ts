import dataSource from "./dataSource";
import { ApolloServer, gql } from "apollo-server";
import Wilder from "./entities/Wilder";
import Skill from "./entities/Skill";

const typeDefs = gql`
  type Wilder {
    id: ID
    name: String
    city: String
    skills: [Skill]
  }
  type Skill {
    id: ID
    name: String
    wilders: [Wilder]
  }
  type Query {
    getAllWilders: [Wilder]
  }
  type Mutation {
    createSkill(name: String): Skill
  }
`;

const resolvers = {
  Query: {
    async getAllWilders(): Promise<Wilder[]> {
      const wilders = await dataSource.manager.find(Wilder, {
        relations: { skills: true },
      });
      return wilders;
    },
  },

  Mutation: {
    createSkill: async (_: any, args: { name: string }) => {
      const skillToCreate = new Skill();
      skillToCreate.name = args.name;
      return await dataSource.manager.save(Skill, skillToCreate);
    },
  },
};

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const server = new ApolloServer({ typeDefs, resolvers });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch (error) {
    console.log("Error starting the server");
  }
};
void start();
