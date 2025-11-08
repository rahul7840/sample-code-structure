import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class QuestionAnswerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Question ID', example: 1 })
    question_id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Answer', example: 'Answer 1' })
    answer: string;
}

export class JoinCommunityDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'Community ID', example: 1 })
    community_id: number;

    @IsNotEmpty()
    @ApiProperty({ description: 'Question Answers', example: { question_id: 1, answer: 'Answer 1' } })
    questionAnswers: QuestionAnswerDto[];

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: 'User ID', example: 1 })
    user_id: number;
}