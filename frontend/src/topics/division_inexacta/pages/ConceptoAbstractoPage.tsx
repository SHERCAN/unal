import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import Image from 'next/image';
import imgSrc from '../Frame 166.png';

interface Props { zoom?: number; }

export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }}>
            <div className="flex justify-center items-center w-full">
                <Image
                    src={imgSrc}
                    alt="División inexacta - Concepto abstracto: el concepto de residuo en la división"
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>
        </BookPageContainer>
    );
}
