import {serializable, serialize} from '../decorators/serializers';
import {Resource} from './resource';

@serializable()
export class TrainingPlan extends Resource {
    private _id: number;
    private _name: string;


    @serialize()
	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
    }
    
    @serialize()
	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
    
    
}