import { ADD_FORM_VALUES } from 'src/_models/types';

export const addFormValues = (field: string, value: any) => ({
    type: ADD_FORM_VALUES,
    payload: { [field]: value }
});
