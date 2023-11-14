import { Pipe, PipeTransform } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";

@Pipe({
  name: "formErrors",
})
export class FormErrorsPipe implements PipeTransform {
  transform(value: string | number, advertForm: FormGroup): unknown {
    let errors: ValidationErrors | null = [];
    // if (data.description) {
    const description = advertForm.controls["description"];
    if (description.invalid && description.touched && description.value?.length) {
      console.log(advertForm.controls["description"].errors);
      errors = advertForm.controls["description"].errors;
    }
    // }
    return errors;
  }
}
