import { Resource } from "./resource";
import { serializable, serialize } from "../decorators/serializers";

@serializable()
export class Exercise extends Resource {
	private _id: number;
    private _defaultName: string;
    private _youtubeLink: string;
    private _exerciseLanguageVersions: ExerciseLanguageVersion[];

	@serialize()
	public get defaultName(): string {
		return this._defaultName;
	}

	public set defaultName(value: string) {
		this._defaultName = value;
	}
    
	@serialize()
	public get youtubeLink(): string {
		return this._youtubeLink;
	}

	public set youtubeLink(value: string) {
		this._youtubeLink = value;
    }

	public get exerciseLanguageVersions(): ExerciseLanguageVersion[] {
		return this._exerciseLanguageVersions;
	}

	public set exerciseLanguageVersions(value: ExerciseLanguageVersion[]) {
		this._exerciseLanguageVersions = value;
	}

	@serialize()
	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}
	

}

export class ExerciseLanguageVersion {
    private _name: string;
    private _languageVersionCode: string;

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
    }

	public get languageVersionCode(): string {
		return this._languageVersionCode;
	}

	public set languageVersionCode(value: string) {
		this._languageVersionCode = value;
	}
}
    
