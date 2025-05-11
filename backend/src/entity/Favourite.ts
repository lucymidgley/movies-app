import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne
} from "typeorm";
import { Movie } from "./Movie";
import { User } from "./User";

@Entity({ name: "favourites" })
export class Favourite {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User

    @OneToOne(() => Movie)
    @JoinColumn()
    movie: Movie

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}