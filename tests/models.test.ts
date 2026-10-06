import { describe, it, expect } from 'vitest';
import {
  UserModel,
  DeckModel,
  CardModel,
  ErrorItemModel,
  StudyDayModel,
  QuizAttemptModel,
  WritingSubmissionModel,
  SpeakingQuestionModel,
  SpeakingAttemptModel,
} from '@/models';

describe('Mongoose Models Schema Definition', () => {
  it('should initialize all 9 core models properly', () => {
    expect(UserModel.modelName).toBe('User');
    expect(DeckModel.modelName).toBe('Deck');
    expect(CardModel.modelName).toBe('Card');
    expect(ErrorItemModel.modelName).toBe('ErrorItem');
    expect(StudyDayModel.modelName).toBe('StudyDay');
    expect(QuizAttemptModel.modelName).toBe('QuizAttempt');
    expect(WritingSubmissionModel.modelName).toBe('WritingSubmission');
    expect(SpeakingQuestionModel.modelName).toBe('SpeakingQuestion');
    expect(SpeakingAttemptModel.modelName).toBe('SpeakingAttempt');
  });

  it('should contain expected default fields for Card SM-2 algorithm', () => {
    const cardDefaults = CardModel.schema.obj;
    expect(cardDefaults.easeFactor).toBeDefined();
    expect(cardDefaults.interval).toBeDefined();
    expect(cardDefaults.repetitions).toBeDefined();
    expect(cardDefaults.nextReview).toBeDefined();
  });
});
