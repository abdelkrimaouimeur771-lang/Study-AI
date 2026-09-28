import { StudyResult } from '../types';

export function formatResultToMarkdown(result: StudyResult): string {
  let md = '';

  if (result.type === 'summary') {
    md += `# ${result.title}\n\n`;
    md += `## Overview Summary\n${result.shortSummary}\n\n`;
    
    if (result.keyPoints?.length) {
      md += `## Key Takeaways\n`;
      result.keyPoints.forEach((point) => {
        md += `- ${point}\n`;
      });
      md += '\n';
    }

    if (result.vocabulary?.length) {
      md += `## Essential Vocabulary\n`;
      result.vocabulary.forEach((v) => {
        md += `- **${v.term}**: ${v.definition}\n`;
      });
      md += '\n';
    }

    if (result.quickReviewTips?.length) {
      md += `## Quick Review & Exam Tips\n`;
      result.quickReviewTips.forEach((tip) => {
        md += `- ${tip}\n`;
      });
      md += '\n';
    }
  } else if (result.type === 'key_points') {
    md += `# ${result.title}\n\n`;
    if (result.overview) {
      md += `> ${result.overview}\n\n`;
    }

    result.categories?.forEach((cat) => {
      md += `## ${cat.categoryName}\n`;
      cat.points.forEach((p) => {
        md += `- ${p}\n`;
      });
      md += '\n';
    });

    if (result.formulasOrPrinciples?.length) {
      md += `## Key Formulas & Principles\n`;
      result.formulasOrPrinciples.forEach((item) => {
        md += `### ${item.name}\n`;
        md += `- **Rule**: ${item.rule}\n`;
        if (item.example) md += `- **Example**: ${item.example}\n`;
        md += '\n';
      });
    }

    if (result.commonPitfalls?.length) {
      md += `## Common Pitfalls & Mistakes\n`;
      result.commonPitfalls.forEach((pitfall) => {
        md += `- ⚠️ ${pitfall}\n`;
      });
      md += '\n';
    }
  } else if (result.type === 'quiz') {
    md += `# ${result.title}\n`;
    md += `**Difficulty Level:** ${result.difficulty}\n\n`;

    result.questions?.forEach((q, index) => {
      md += `### Question ${index + 1}: ${q.question}\n\n`;
      q.options.forEach((opt, optIndex) => {
        const isCorrect = optIndex === q.correctAnswer;
        md += `  ${String.fromCharCode(65 + optIndex)}. ${opt} ${isCorrect ? '(Correct)' : ''}\n`;
      });
      md += `\n**Explanation:** ${q.explanation}\n\n---\n\n`;
    });
  } else if (result.type === 'flashcards') {
    md += `# ${result.title}\n\n`;
    result.cards?.forEach((card, index) => {
      md += `### Card ${index + 1}${card.category ? ` [${card.category}]` : ''}\n`;
      md += `**Question / Front:**\n${card.front}\n\n`;
      md += `**Answer / Back:**\n${card.back}\n\n`;
      if (card.hint) {
        md += `*Hint:* ${card.hint}\n\n`;
      }
      md += `---\n\n`;
    });
  } else if (result.type === 'study_plan') {
    md += `# ${result.title}\n`;
    md += `**Total Duration:** ${result.totalDurationDays} Days | **Daily Commitment:** ${result.dailyCommitment}\n\n`;

    result.schedule?.forEach((day) => {
      md += `## Day ${day.day}: ${day.focusArea}\n`;
      md += `⏱️ Suggested Time: ${day.suggestedTime}\n\n`;
      md += `### Action Tasks:\n`;
      day.tasks.forEach((task) => {
        md += `- [ ] ${task}\n`;
      });
      md += `\n**Checkpoint:** ${day.reviewCheckpoint}\n\n---\n\n`;
    });

    if (result.retentionTips?.length) {
      md += `## Long-Term Retention Strategies\n`;
      result.retentionTips.forEach((tip) => {
        md += `- 💡 ${tip}\n`;
      });
    }
  }

  md += `\n\n*Generated with StudyFlow AI — AI Study Assistant*\n`;
  return md;
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
}
