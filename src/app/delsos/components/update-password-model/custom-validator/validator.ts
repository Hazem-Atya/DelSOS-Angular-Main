import { FormControl } from "@angular/forms";

interface Validator<T extends FormControl> {
  (c:T): {[error: string]:any};
}