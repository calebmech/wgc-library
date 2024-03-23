import { Select, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { useSearch } from '../../context/SearchContext';
import { Group } from '../../types';

export default function GroupSelector() {
  const { group, setGroup } = useSearch();

  return (
    <Select
      background={useColorModeValue('white', 'gray.700')}
      value={group ?? ''}
      onChange={(event) =>
        setGroup(event.target.value ? (event.target.value as Group) : undefined)
      }
      aria-label="Format"
    >
      <option value="">All audiences</option>
      {Object.values(Group).map((group) => (
        <option key={group} value={group}>
          {groupToLabel[group]}
        </option>
      ))}
    </Select>
  );
}

const groupToLabel: Record<Group, string> = {
  Y: 'Youth',
  Family: 'Family',
  Jr: 'Junior',
  CH: 'Children',
  "Gino's Pick": "Gino's Pick",
};
