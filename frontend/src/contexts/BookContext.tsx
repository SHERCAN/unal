import React, { createContext, useContext } from 'react';

interface BookContextType {
    topicId: string;
    globalPageNumber: number;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ value: BookContextType; children: React.ReactNode }> = ({ value, children }) => {
    return <BookContext.Provider value={value}>{children}</BookContext.Provider>;
};

export const useBookContext = () => {
    return useContext(BookContext);
};
