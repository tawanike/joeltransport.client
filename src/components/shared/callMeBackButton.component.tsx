import { FC } from "react";
import { Button } from "react-bootstrap";
import { useRouter } from 'next/router'

interface IProps {
    title: string;
}
const CallMeBackButton: FC<IProps> = ({ title }) => {
    const router = useRouter();
    return <>
        <Button
            variant="outline-secondary"
            className='me-3'
            onClick={() => router.push(`/contact-us`)}>{title}</Button>
    </>
}

export default CallMeBackButton;
