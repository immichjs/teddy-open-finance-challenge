import {
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { LinkEntity } from './LinkEntity';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ length: '255' })
	name: string;

	@Column({ length: '255' })
	email: string;

	@Column()
	password: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@OneToMany(() => LinkEntity, (link) => link.user)
	@JoinTable({ name: 'user_shortened_links' })
	shortenedLinks: LinkEntity;
}
