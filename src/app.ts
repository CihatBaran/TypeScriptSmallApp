function autobind(target: any, _key: any, descriptor:any) {
    let actualFunction = descriptor.value;
    const targetThis = target.constructor;
    

    return {
        configurable: true,

        get() {
            let boundFn = actualFunction.bind(this);
            Reflect.defineProperty(targetThis, actualFunction, {
                value: boundFn,
                configurable: true,
                writable: true
            });

            return function() {
                return boundFn.apply(targetThis, arguments)
            };
        }
    };
}
interface IUserInput {title:string | null; description:string | null; people:number | null}

class ProjectInput {
    // Static
    private static elementNames  = {
        hostElement: "app",
        userInput: "user-input",
        title: "title",
        description: "description",
        people: "people"
        
    }
    
    // Public
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    
    // private 
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;
    
    constructor() {
        const elements = {
            app:document.getElementById(ProjectInput.elementNames.hostElement),
            form: document.getElementById(ProjectInput.elementNames.userInput),
            title: document.getElementById(ProjectInput.elementNames.title),
            description: document.getElementById(ProjectInput.elementNames.description),
            people: document.getElementById(ProjectInput.elementNames.people),
            
        };
        
        //this.templateElement=<HTMLTemplateElement>document.getElementById("project-input");
        this.hostElement=elements.app! as HTMLDivElement;
        this.formElement = elements.form! as HTMLFormElement;
        
        
        // get the form detail
        this.titleInputElement = elements.title! as HTMLInputElement;
        this.descriptionInputElement = elements.description! as HTMLTextAreaElement;
        this.peopleInputElement = elements.people! as HTMLInputElement;
        this._configure();
        
        this._attach();
    }
    
    
    
    private _getUserInput(): IUserInput  {
        const inputTitle = this.titleInputElement.value;
        const inputDescription = this.descriptionInputElement.value;
        const inputPeople = this.peopleInputElement.value;
        return {
            title: (inputTitle !== '') ? inputTitle: null,
            description: (inputDescription !== '') ? inputDescription: null,
            people: (inputPeople !== '') ? parseInt(inputPeople) : null
        }
    }
    
    @autobind
    private _submitHandler(event: Event): void {
        event.preventDefault();
        const userInput = this._getUserInput();
        console.log(userInput);
        
    }
    
    private _configure(): void {
        this.formElement.addEventListener('submit', this._submitHandler);  
    }
    
    private _attach(): void {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}

const projectInput = new ProjectInput();

