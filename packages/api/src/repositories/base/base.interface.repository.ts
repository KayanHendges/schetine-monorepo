export interface BaseInterfaceRepository<Entity> {
  create(data: Entity | any): Promise<Entity>;
}
