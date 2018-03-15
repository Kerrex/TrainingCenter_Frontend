import {TrainingPlan} from './training-plan';
import {Exercise} from './exercise';
import {serializable, serialize} from '../decorators/serializers';
import {Resource} from './resource';

@serializable()
export class ExerciseTrainingPlan extends Resource {
    private _exercise: Exercise;
    private _trainingPlan: TrainingPlan;
    private _seriesCount: number;
    private _intensivity: number;

    @serialize()
	public get exercise(): Exercise {
		return this._exercise;
	}

	public set exercise(value: Exercise) {
		this._exercise = value;
	}

    @serialize()
	public get trainingPlan(): TrainingPlan {
		return this._trainingPlan;
	}

	public set trainingPlan(value: TrainingPlan) {
		this._trainingPlan = value;
	}

    @serialize()
	public get seriesCount(): number {
		return this._seriesCount;
	}

	public set seriesCount(value: number) {
		this._seriesCount = value;
	}

    @serialize()
	public get intensivity(): number {
		return this._intensivity;
	}

	public set intensivity(value: number) {
		this._intensivity = value;
	}
    
}