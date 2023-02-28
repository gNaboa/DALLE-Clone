type FormFieldProps = {
    labelName?: string,
    type?: string,
    name?: string,
    placeholder?: string,
    value?: string
}

export function FormField({labelName}:FormFieldProps) {
    return (
        <div>
            <div className="flex items-center gap-2 mb-2">
                <label
                 htmlFor=""
                 className="block text-sm font-medium
                  text-gray-900"
                 >{labelName}</label>
                 <input type="text" />
            </div>
        </div>
    )
}