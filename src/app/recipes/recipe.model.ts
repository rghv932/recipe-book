import { Ingrediant } from "../shared/ingrediant.model";

export class Recipe{
  public name:string;
  public description:string;
  public imagePath:string;
  public ingrediants:Ingrediant[];

  constructor(n:string,desc:string,imageP:string, ingrediants:Ingrediant[]){
    this.name=n;
    this.description=desc;
    this.imagePath=imageP;
    this.ingrediants=ingrediants;

  }
}