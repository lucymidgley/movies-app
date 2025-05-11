import { Alert } from '@mantine/core';
import { FC } from 'react';
import { CiCircleInfo } from "react-icons/ci";



export const ErrorMessage: FC<{ error: string }> = ({ error }) => {
    const icon = <CiCircleInfo />;
    return (
        <Alert variant="light" color="red" title="Something went wrong" icon={icon} mb={20} mt={5}>
            {error}
        </Alert>
    );
}