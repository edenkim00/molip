import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

interface MolipInputProps {
    text: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    customStyle?: string;
    secureTextEntry?: boolean;
}

export function MolipInput({
    text,
    onChangeText,
    placeholder,
    customStyle,
    secureTextEntry = false,
}: MolipInputProps): JSX.Element {
    const [borderClassName, setBorderClassName] = useState(
        'border-black text-black',
    );

    return (
        <View
            className={`w-[80%] border-[1.2px] rounded-3xl border-black ${borderClassName} ${customStyle}`}>
            <TextInput
                value={text}
                onChangeText={onChangeText}
                placeholder={placeholder}
                className={`px-6 py-4 border-gray-600 ${borderClassName}`}
                onFocus={() =>
                    setBorderClassName('border-[#504593] text-[#504593]')
                }
                onBlur={() => setBorderClassName('border-black text-black')}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}
