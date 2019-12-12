import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfigCache } from '../../models';
import { createBuilder } from '@ngx-formly/core/testing';

function buildField({ model, options, form, ...field }: FormlyFieldConfigCache): FormlyFieldConfigCache {
  const builder = createBuilder({
    extensions: ['core', 'validation', 'form'],
  });

  builder.buildField({
    model: model || {},
    options,
    form,
    fieldGroup: [field],
  });

  return field;
}

describe('FieldFormExtension', () => {
  describe('assign model field to form control', () => {
    it('should match undefined model value', () => {
      const { form } = buildField({
        model: { foo: null },
        fieldGroup: [{ key: 'foo' }, { key: 'bar' }],
      });

      expect(form.get('bar').value).toBeUndefined();
      expect(form.get('foo').value).toBeNull();
    });

    it('should assign model for nested field key', () => {
      const { form } = buildField({
        key: 'address.city',
        model: { address: { city: 'test' } },
      });

      expect(form.get('address.city')).not.toBeNull();
      expect(form.get('address.city').value).toEqual('test');
    });

    it('should assign model for nested field integer key', () => {
      const { form } = buildField({
        key: 'a.1',
        model: { a: ['foo', 'bar'] },
      });

      expect(form.get('a.1').value).toEqual('bar');
    });

    it('should assign model for nested field fieldGroup', () => {
      const { form } = buildField({
        key: 'a.b',
        fieldGroup: [{ key: 'c' }],
        model: { a: { b: { c: 'foo' } } },
      });

      expect(form.get('a.b').value).toEqual({ c: 'foo' });
    });
  });

  describe('field', () => {
    it('should assign parent form to field', () => {
      const field = buildField({ key: 'title' });

      expect(field.form instanceof FormGroup).toBeTrue();
      expect(field.form).toBe(field.parent.formControl as FormGroup);
    });

    it('should assign parent form to root field', () => {
      const field = buildField({
        key: 'title',
        formControl: new FormControl(),
      });

      expect(field.form).toBe(field.formControl.parent as FormGroup);
    });

    it('should create formControl when key exist', () => {
      const field = buildField({ key: 'title' });

      expect(field.formControl instanceof FormControl).toBeTrue();
    });

    it('should not create formControl when key is empty', () => {
      const field = buildField({});

      expect(field.formControl).toBeUndefined();
    });

    it('should use the same formcontrol for fields that use the same key', () => {
      const {
        fieldGroup: [f1, f2],
      } = buildField({
        fieldGroup: [{ key: 'test' }, { key: 'test' }],
      });

      expect(f1.formControl).toEqual(f2.formControl);
    });
  });

  describe('fieldGroup', () => {
    it('should create FormGroup control when fieldGroup and key are set', () => {
      const field = buildField({ key: 'test', fieldGroup: [] });

      expect(field.formControl instanceof FormGroup).toBeTrue();
    });

    it('should assign parent formcontrol when key is empty', () => {
      const field = buildField({ fieldGroup: [] });

      expect(field.formControl).toEqual(field.form);
    });
  });

  it('should use existing formcontrol from built form', () => {
    const fooControl = new FormControl();
    const field = buildField({
      key: 'foo',
      form: new FormGroup({ foo: fooControl }),
    });

    expect(field.formControl).toBe(fooControl);
  });

  it('should override existing formcontrol when key is empty', () => {
    const field = buildField({
      fieldGroup: [],
      formControl: new FormControl(),
    });

    expect(field.formControl).toEqual(field.form);
  });

  it('should update the formcontrol validation when field update', () => {
    const formControl = new FormControl();
    spyOn(formControl, 'setValidators');
    spyOn(formControl, 'setAsyncValidators');
    spyOn(formControl, 'updateValueAndValidity');
    const field = buildField({
      key: 'test',
      formControl,
      templateOptions: { required: true },
      form: new FormGroup({ test: formControl }),
    });

    expect(formControl.setValidators).toHaveBeenCalledWith(field._validators);
    expect(formControl.updateValueAndValidity).toHaveBeenCalledTimes(1);
  });

  describe('templateOptions disabled state', () => {
    it('should disable sub-fields when parent is disabled', () => {
      const field = buildField({
        key: 'address',
        templateOptions: { disabled: true },
        fieldGroup: [{ key: 'city' }, { key: 'street' }],
      });

      const control = field.formControl;
      expect(control.disabled).toBeTrue();
      expect(control.get('city').disabled).toBeTrue();
      expect(control.get('street').disabled).toBeTrue();
    });

    it('should not affect parent disabled state', () => {
      const field = buildField({
        key: 'address',
        fieldGroup: [{ key: 'city', templateOptions: { disabled: true } }, { key: 'street' }],
      });

      const control = field.formControl;
      expect(control.disabled).toBeFalse();
      expect(control.get('city').disabled).toBeTrue();
      expect(control.get('street').disabled).toBeFalse();
    });
  });
});
