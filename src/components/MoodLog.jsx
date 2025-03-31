import React, { useState, useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/MoodLog.css';

function MoodLog() {
  const { translations } = useContext(LanguageContext);
  const { token } = useContext(AuthContext);
  const [moodValue, setMoodValue] = useState(50);
  const [isMoodSelected, setIsMoodSelected] = useState(false);
  const [selectedDescriptors, setSelectedDescriptors] = useState([]);
  const [selectedFactors, setSelectedFactors] = useState([]);
  const [note, setNote] = useState('');

  const getMoodLabel = (value) => {
    if (value <= 20) return translations.mood.veryUnpleasant || 'Very Unpleasant';
    if (value <= 40) return translations.mood.unpleasant || 'Unpleasant';
    if (value <= 60) return translations.mood.neutral || 'Neutral';
    if (value <= 80) return translations.mood.pleasant || 'Pleasant';
    return translations.mood.veryPleasant || 'Very Pleasant';
  };

  const getKaleidoscopeColors = (value) => {
    if (value <= 20) return ['#6B4EFF', '#4834D4', '#2E1E9B'];
    if (value <= 40) return ['#8A6CFF', '#5E42E6', '#3F2D99'];
    if (value <= 60) return ['#66C7FF', '#40C4FF', '#0288D1'];
    if (value <= 80) return ['#FFB347', '#FFCA28', '#FFA000'];
    return ['#FF9500', '#FF5722', '#D81B60'];
  };

  const descriptors = {
    veryUnpleasant: [
      translations.mood.emotions.angry || 'Angry',
      translations.mood.emotions.sad || 'Sad',
      translations.mood.emotions.drained || 'Drained',
      translations.mood.emotions.stressed || 'Stressed',
      translations.mood.emotions.hopeless || 'Hopeless',
      translations.mood.emotions.frustrated || 'Frustrated',
      translations.mood.emotions.overwhelmed || 'Overwhelmed',
      translations.mood.emotions.lonely || 'Lonely',
      translations.mood.emotions.exhausted || 'Exhausted',
      translations.mood.emotions.despairing || 'Despairing'
    ],
    unpleasant: [
      translations.mood.emotions.worried || 'Worried',
      translations.mood.emotions.tense || 'Tense',
      translations.mood.emotions.irritated || 'Irritated',
      translations.mood.emotions.disappointed || 'Disappointed',
      translations.mood.emotions.anxious || 'Anxious',
      translations.mood.emotions.unmotivated || 'Unmotivated',
      translations.mood.emotions.nervous || 'Nervous',
      translations.mood.emotions.gloomy || 'Gloomy',
      translations.mood.emotions.bored || 'Bored',
      translations.mood.emotions.restless || 'Restless'
    ],
    neutral: [
      translations.mood.emotions.calm || 'Calm',
      translations.mood.emotions.content || 'Content',
      translations.mood.emotions.indifferent || 'Indifferent',
      translations.mood.emotions.balanced || 'Balanced',
      translations.mood.emotions.okay || 'Okay',
      translations.mood.emotions.stable || 'Stable'
    ],
    pleasant: [
      translations.mood.emotions.happy || 'Happy',
      translations.mood.emotions.peaceful || 'Peaceful',
      translations.mood.emotions.relaxed || 'Relaxed',
      translations.mood.emotions.grateful || 'Grateful',
      translations.mood.emotions.satisfied || 'Satisfied',
      translations.mood.emotions.hopeful || 'Hopeful'
    ],
    veryPleasant: [
      translations.mood.emotions.joyful || 'Joyful',
      translations.mood.emotions.excited || 'Excited',
      translations.mood.emotions.amazed || 'Amazed',
      translations.mood.emotions.inspired || 'Inspired',
      translations.mood.emotions.elated || 'Elated',
      translations.mood.emotions.thrilled || 'Thrilled'
    ]
  };

  const factors = [
    translations.mood.factorsList.work || 'Work',
    translations.mood.factorsList.family || 'Family',
    translations.mood.factorsList.health || 'Health',
    translations.mood.factorsList.friends || 'Friends',
    translations.mood.factorsList.partner || 'Partner',
    translations.mood.factorsList.dating || 'Dating',
    translations.mood.factorsList.weather || 'Weather',
    translations.mood.factorsList.money || 'Money',
    translations.mood.factorsList.currentEvents || 'Current Events',
    translations.mood.factorsList.sleep || 'Sleep',
    translations.mood.factorsList.other || 'Other'
  ];

  const getDescriptorCategory = (value) => {
    if (value <= 20) return 'veryUnpleasant';
    if (value <= 40) return 'unpleasant';
    if (value <= 60) return 'neutral';
    if (value <= 80) return 'pleasant';
    return 'veryPleasant';
  };

  const handleDescriptorToggle = (desc) => {
    setSelectedDescriptors((prev) =>
      prev.includes(desc) ? prev.filter((d) => d !== desc) : [...prev, desc]
    );
  };

  const handleFactorToggle = (factor) => {
    setSelectedFactors((prev) =>
      prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moodData = {
      type: getMoodLabel(moodValue), // Переименовали mood в type
      value: parseInt(moodValue),
      descriptions: selectedDescriptors, // Переименовали descriptors в descriptions
      factors: selectedFactors,
      note
    };

    try {
      const response = await fetch('http://localhost:5000/mood', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(moodData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при сохранении данных');
      }

      const result = await response.json();
      console.log('Данные успешно сохранены:', result);
      alert(translations.mood.success || 'Mood logged successfully!');

      setMoodValue(50);
      setSelectedDescriptors([]);
      setSelectedFactors([]);
      setNote('');
      setIsMoodSelected(false);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
      alert(error.message || translations.mood.error || 'Error logging mood');
    }
  };

  const renderKaleidoscope = () => {
    const [color1, color2, color3] = getKaleidoscopeColors(moodValue);
    const segments = [];
    const segmentCount = 16;
    const angleStep = 360 / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
      const angle = i * angleStep;
      const x1 = 50 + 45 * Math.cos((angle * Math.PI) / 180);
      const y1 = 50 + 45 * Math.sin((angle * Math.PI) / 180);
      const x2 = 50 + 45 * Math.cos(((angle + angleStep) * Math.PI) / 180);
      const y2 = 50 + 45 * Math.sin(((angle + angleStep) * Math.PI) / 180);

      segments.push(
        <path
          key={`outer-${i}`}
          d={`M50,50 L${x1},${y1} A45,45 0 0,1 ${x2},${y2} Z`}
          fill={color1}
          opacity={0.7}
        />
      );
    }

    for (let i = 0; i < segmentCount; i++) {
      const angle = i * angleStep + (moodValue / 100) * 10;
      const radius = 30 + (moodValue / 100) * 10;
      const x1 = 50 + radius * Math.cos((angle * Math.PI) / 180);
      const y1 = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const x2 = 50 + radius * Math.cos(((angle + angleStep) * Math.PI) / 180);
      const y2 = 50 + radius * Math.sin(((angle + angleStep) * Math.PI) / 180);

      segments.push(
        <path
          key={`middle-${i}`}
          d={`M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
          fill={color2}
          opacity={0.6}
        />
      );
    }

    for (let i = 0; i < segmentCount * 2; i++) {
      const angle = (i * angleStep) / 2 + (moodValue / 100) * 15;
      const radius = 15 + (moodValue / 100) * 5;
      const x1 = 50 + radius * Math.cos((angle * Math.PI) / 180);
      const y1 = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const x2 = 50 + radius * Math.cos(((angle + angleStep / 2) * Math.PI) / 180);
      const y2 = 50 + radius * Math.sin(((angle + angleStep / 2) * Math.PI) / 180);

      segments.push(
        <path
          key={`inner-${i}`}
          d={`M50,50 L${x1},${y1} A${radius},${radius} 0 0,1 ${x2},${y2} Z`}
          fill={color3}
          opacity={0.5}
        />
      );
    }

    segments.push(
      <circle key="center-1" cx="50" cy="50" r="10" fill={color1} opacity="0.9" />,
      <circle key="center-2" cx="50" cy="50" r="5" fill={color2} opacity="1" />
    );

    return segments;
  };

  return (
    <div className="mood-log-container">
      <h1>{translations.mood.title || 'Log Your Mood'}</h1>
      <div className="card">
        <h2>{translations.mood.subtitle || 'How are you feeling?'}</h2>
        <div className="mood-slider">
          <svg className="kaleidoscope" width="150" height="150" viewBox="0 0 100 100">
            {renderKaleidoscope()}
          </svg>
          <p className="mood-label">{getMoodLabel(moodValue)}</p>
          <input
            type="range"
            min="0"
            max="100"
            value={moodValue}
            onChange={(e) => {
              setMoodValue(e.target.value);
              setIsMoodSelected(true);
            }}
            className="slider"
          />
          <div className="mood-range-labels">
            <span>{translations.mood.veryUnpleasant || 'Very Unpleasant'}</span>
            <span>{translations.mood.veryPleasant || 'Very Pleasant'}</span>
          </div>
        </div>

        {isMoodSelected && (
          <form onSubmit={handleSubmit}>
            <div className="section">
              <p>{translations.mood.describe || 'What best describes this feeling?'}</p>
              <div className="factor-list">
                {descriptors[getDescriptorCategory(moodValue)].map((desc) => (
                  <span
                    key={desc}
                    className={selectedDescriptors.includes(desc) ? 'selected' : ''}
                    onClick={() => handleDescriptorToggle(desc)}
                  >
                    {desc}
                  </span>
                ))}
              </div>
            </div>

            <div className="section">
              <p>{translations.mood.factors || 'What’s having the biggest impact?'}</p>
              <div className="factor-list">
                {factors.map((factor) => (
                  <span
                    key={factor}
                    className={selectedFactors.includes(factor) ? 'selected' : ''}
                    onClick={() => handleFactorToggle(factor)}
                  >
                    {factor}
                  </span>
                ))}
              </div>
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={translations.mood.note || 'Add a note...'}
              className="mood-note"
            />

            <button type="submit" className="submit-button">
              {translations.mood.submit || 'Log'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default MoodLog;