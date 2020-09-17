import LoadingComponent from './LoadingComponent';
import Header from './Header';
import UserForm from './UserForm';
import PINForm from './PINForm';
import FormModalComp from './FormModalComp';
// notice we're building out a 'package' of reusables here and exporting them as an object of component properties.
// to use this, simply `import {foo, bar, baz} from '<path-to-this-directory>/ReusableComponents';`
export { LoadingComponent, Header, UserForm, PINForm, FormModalComp };
