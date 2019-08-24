function logged(constructorFn: Function) { //it can get only constructor if you want to pass it to or attach to a class
    console.log(constructorFn);
}

@logged
class Person {
    constructor() {
        console.log("Hi!")
    }
}

//Factory
function logging(value: boolean):any {
    return value ? logged : null;
}

@logging(true)
class Car {

}

// Advanced
function printable(constructorFn: Function) {
    constructorFn.prototype.print = function () {
        console.log(this);
    }
}

@logging(true)
@printable
class Plant {
    name = "Green Plant";
}

const plant = new Plant();
(<any>plant).print(); //TS doesn't really recognize that this print function does exist, you have to use type <any>

// Method Decorator
// Property Decorator
function editable(value: boolean) { // for static method or static class we have to use constructorFn
    return function (target: any, propName: string, descriptor: PropertyDescriptor) { // for instance we can do in such way
           descriptor.writable = value; // descriptor is equal defineProperty e.q configurable, writable
    }
}

function overwritable(value: boolean) { // type factory
    return function(target: any, propName: string): any { // in this case we don't have to descriptor, and we have to add manually
        const newDescriptor: PropertyDescriptor = {
            writable: value
        };
        return newDescriptor
    }
 }



class Project {
    @overwritable(true) // such type decorator should be use as listener
    projectName: string;

    constructor(name: string) {
        this.projectName = name;
    }

    @editable(true)
    calcBudget() {
        console.log(1000);
    }
}

const project = new Project("Super Power");
project.calcBudget()
project.calcBudget = function(){
    console.log(2000);
};
project.calcBudget();

//Parameter Decorator
function printInfo(target: any, methodName: string, paramIndex: number) {
    console.log("Target: ", target);
    console.log("methodName: ", methodName);
    console.log("paramIndex: ", paramIndex);
}

class Course {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    printStudentNumber(mode: string, @printInfo printAll: boolean) {
        if(printAll) {
            console.log(10000);
        } else {
            console.log(2000);
        }
    }
}
const course = new Course("Super Course");
course.printStudentNumber("anything", true);
course.printStudentNumber("anything", false);