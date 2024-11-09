import React, {useState, useEffect} from 'react';
import {MolipInput} from '@components/inputs/input';
import {Space} from '@components/space';

interface PasswordInputProps {
    password: string;
    setPassword: (password: string) => void;
    setChecked: (checked: boolean) => void;
}

export function PasswordInput({
    setChecked,
    password,
    setPassword,
}: PasswordInputProps): JSX.Element {
    const [passwordForCheck, setPasswordForCheck] = useState('');
    useEffect(() => {
        if (passwordForCheck === '') {
            setChecked(false);
            return;
        }
        setChecked(password === passwordForCheck);
        if (passwordForCheck === '') {
            setBorderClassName('');
        } else {
            setBorderClassName(
                password === passwordForCheck
                    ? 'border-green-500'
                    : 'border-red-500',
            );
        }
    }, [password, passwordForCheck]);

    const [borderClassName, setBorderClassName] = useState('');

    return (
        <>
            <MolipInput
                text={password}
                onChangeText={setPassword}
                placeholder="Enter New Password"
                secureTextEntry={true}
            />
            <Space heightClassName={'h-3'} />
            <MolipInput
                text={passwordForCheck}
                onChangeText={setPasswordForCheck}
                placeholder="Confirm New Password"
                customStyle={borderClassName}
                secureTextEntry={true}
            />
        </>
    );
}
