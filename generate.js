#!/usr/bin/node

const filesNames = process.argv.slice(2)
    .map(path => path.slice(path.lastIndexOf('/') + 1))
    .filter(path => !path.includes('manifest'));

const firstFile = process.argv.slice(2)[0];
const type = firstFile.includes('negative') ? 'Negative' : 'Positive';
const path = firstFile.substring(0, firstFile.indexOf('/'));

const labels = filesNames
    .map(name => name.slice(0, name.lastIndexOf('.')))
    .map(name => `:${name}\n`)
    .join('');

const entries = filesNames
    .map(name => `:${name.slice(0, name.lastIndexOf('.'))} rdf:type   mf:${type}${name.includes('update') ? 'Update' : ''}SyntaxTest11 ;
   dawgt:approval dawgt:Proposed ;
   mf:name    "${name}" ;
   mf:action  <${name}> .`)
    .join('\n\n');

console.log(
`@prefix :       <https://w3c.github.io/rdf-tests/sparql/sparql12/${path}/manifest#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix mf:     <http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#> .
@prefix qt:     <http://www.w3.org/2001/sw/DataAccess/tests/test-query#> .
@prefix dawgt:  <http://www.w3.org/2001/sw/DataAccess/tests/test-dawg#> .

<>  rdf:type mf:Manifest ;
    rdfs:label "${type} Syntax Triple Terms" ;
    rdfs:comment "${type} syntax tests for triple terms in SPARQL 1.2" ;
    mf:entries
    (
${labels}
) .

${entries}`);
