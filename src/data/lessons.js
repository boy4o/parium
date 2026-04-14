// ======================================================
// ПариУМ — Централен файл за уроците
// Импортира и обединява уроците от всички възрастови групи
// ======================================================

import { LESSONS_5_6 } from './lessons-5-6';
import { LESSONS_7_8 } from './lessons-7-8';
import { LESSONS_9_10 } from './lessons-9-10';
import { LESSONS_11_14 } from './lessons-11-14';
import { LESSONS_15_18 } from './lessons-15-18';

export const LESSONS = {
  ...LESSONS_5_6,
  ...LESSONS_7_8,
  ...LESSONS_9_10,
  ...LESSONS_11_14,
  ...LESSONS_15_18,
};
