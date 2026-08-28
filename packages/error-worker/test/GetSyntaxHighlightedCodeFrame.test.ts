import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getSyntaxHighlightedCodeFrame } from '../src/parts/GetSyntaxHighlightedCodeFrame/GetSyntaxHighlightedCodeFrame.ts'

test('getSyntaxHighlightedCodeFrame', () => {
  const result = getSyntaxHighlightedCodeFrame([
    ['const', 'Token Keyword', ' value = 1', 'Token Text'],
    ['throw', 'Token Keyword', ' value', 'Token Text'],
  ])

  expect(result).toEqual([
    {
      childCount: 2,
      className: 'SyntaxHighlightedCodeFrame',
      type: VirtualDomElements.Pre,
    },
    {
      childCount: 3,
      className: 'SyntaxHighlightedCodeFrameLine',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token Keyword',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'const',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'Token Text',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: ' value = 1',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 0,
      text: '\n',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 2,
      className: 'SyntaxHighlightedCodeFrameLine',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 1,
      className: 'Token Keyword',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: 'throw',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'Token Text',
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      text: ' value',
      type: VirtualDomElements.Text,
    },
  ])
})
