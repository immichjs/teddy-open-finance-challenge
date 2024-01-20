import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity('links')
export class LinkEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column()
	originalLink: string;

	@Column({ length: 6 })
	shortenedLink: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;

	@Column({ type: 'int', default: 0 })
	clicks: number;

	@Column({ type: 'timestamp with time zone', nullable: true })
	deletionDate: Date;

	@ManyToOne(() => UserEntity, (user) => user.shortenedLinks)
	user: UserEntity;
}
