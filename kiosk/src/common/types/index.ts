//creeam Interfaces 
export interface ButtonProps {
    label: string;
    type: 'button' | 'submit';
    className?: string;
    onclick?: () => void;
}