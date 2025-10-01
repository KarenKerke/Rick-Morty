import { AbstractControl, FormArray, FormGroup, ValidationErrors} from '@angular/forms';

export class FormUtils {

  static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Valor mínimo de ${errors['minlength'].requiredLength} caracteres.`;

        case 'email':
          return `El valor ingresado no es un correo electrónico`;

        case 'pattern':
          // Detectar qué patrón falló
          const pattern = errors['pattern'].requiredPattern;
          const patternStr = typeof pattern === 'string' ? pattern : pattern.toString();

          // Comparar normalizando ambos a string
          if (patternStr.includes('a-z0-9._%+-') || patternStr.includes('@')) {
            return 'El valor ingresado no luce como un correo electrónico';
          }

          if (patternStr.includes('([a-zA-Z]+) ([a-zA-Z]+)')) {
            return 'El valor ingresado no luce como un nombre completo';
          }

          // Patrón desconocido
          return 'El formato ingresado no es válido';

        default:
          return `Error de validación no controlado ${key}`;
      }
    }

    return null;
  }

  static isValidField(form: FormGroup, fieldName: string): boolean | null {
    return (
      !!form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }

  static getFieldError(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null;

    const errors = form.controls[fieldName].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  static getFieldErrorInArray(
    formArray: FormArray,
    index: number
  ): string | null {
    if (formArray.controls.length === 0) return null;

    const errors = formArray.controls[index].errors ?? {};

    return FormUtils.getTextError(errors);
  }

  static isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value;
      const field2Value = formGroup.get(field2)?.value;

      return field1Value === field2Value ? null : { passwordsNotEqual: true };
    };
  }
}
