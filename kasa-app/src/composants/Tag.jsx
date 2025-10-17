import React from 'react';
import './styles/Tag.css';

export default function Tag({ text }) {
  if (!text) return null;
  return <span className="tag">{text}</span>;
}
