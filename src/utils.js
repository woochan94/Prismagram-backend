import { adjectives, nouns } from "./words";

// 비밀값을 생성할 함수 
export const secretGenerator = () => {
    const randomNumber = Math.floor(Math.random() * adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}