import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Skill from "./Skill";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export default class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field(() => [Skill])
  @ManyToMany(() => Skill, (skill) => skill.wilders, { eager: true })
  @JoinTable()
  skills: Skill[];
}
