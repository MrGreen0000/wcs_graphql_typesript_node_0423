import dataSource from "../dataSource";
import Wilder from "../entities/Wilder";
import Skill from "../entities/Skill";
import { Request, Response } from "express";

export default class WildersController {
  private readonly wildersRepository = dataSource.getRepository(Wilder);
  private readonly skillsRepository = dataSource.getRepository(Skill);

  constructor() {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.addSkillToWilder = this.addSkillToWilder.bind(this);
  }

  private async findOneById(id: number): Promise<Wilder | null> {
    return await this.wildersRepository.findOneBy({ id });
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, city } = req.body;

    await this.wildersRepository.save({
      name,
      city,
    });

    res.status(201).send("Wilder created");
  }

  async read(req: Request, res: Response): Promise<void> {
    const wilders = await this.wildersRepository.find();

    res.send(wilders);
  }

  async readOne(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("invalid ID");
      return;
    }

    const wilder = await this.findOneById(id);

    if (wilder === null) {
      res.status(404).send("Wilder not found");
      return;
    }

    res.send(wilder);
  }

  async update(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("invalid ID");
      return;
    }

    const wilderToUpdate = await this.findOneById(id);
    if (wilderToUpdate == null) {
      res.status(404).send("Wilder to update not found");
      return;
    }

    try {
      await this.wildersRepository.update(id, req.body);
    } catch (error) {
      res.status(400).send("Invalid data");
      return;
    }
    res.send("Willder updated");
  }

  async delete(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).send("invalid ID");
      return;
    }
    const wilderToDelete = await this.findOneById(id);
    if (wilderToDelete == null) {
      res.status(404).send("Wilder to delete not found");
      return;
    }

    await this.wildersRepository.delete(req.params.id);

    res.send("Wilder deleted");
  }

  async addSkillToWilder(req: Request, res: Response): Promise<void> {
    const wilderId = parseInt(req.params.wilderId);
    if (isNaN(wilderId)) {
      res.status(400).send("Invalid wilder ID");
      return;
    }

    const skillId = parseInt(req.params.skillId);
    if (isNaN(skillId)) {
      res.status(400).send("Invalid skill ID");
      return;
    }

    const wilder = await this.findOneById(wilderId);
    if (wilder === null) {
      res.status(404).send("Wilder not found");
      return;
    }

    const skill = await this.skillsRepository.findOneBy({ id: skillId });
    if (skill === null) {
      res.status(404).send("Skill not found");
      return;
    }

    wilder.skills.push(skill);

    await this.wildersRepository.save(wilder);

    res.send("Skill added to Wilder");
  }
}
