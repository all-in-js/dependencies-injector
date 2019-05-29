export default function Injectable () {}

@Inject('a', 'b')
export class UserService {
    constructor(a, b) {
        this.id = id;
    }
    getUserInfo(id) {
        console.log('id');
    }
}

deps[init obj, add, remove], target => function(...deps) => constructor(...deps)

Injector.resolve('a', 'b', function || constructor);
const {a, b} = Injector.resolve('a', 'b');
const [a, b] = Injector.resolve('a', 'b');

