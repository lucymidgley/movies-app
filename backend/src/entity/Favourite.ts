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
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column()
    user_id: number;

    @OneToOne(() => Movie)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie

    @Column()
    movie_id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}