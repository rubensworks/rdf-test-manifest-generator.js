#!/usr/bin/node

const filesNames = process.argv.slice(2)
    .map(path => path.slice(path.lastIndexOf('/') + 1));

const labels = filesNames
    .map(name => name.slice(0, name.lastIndexOf('.')))
    .map(name => `:${name}\n`)
    .join('');

const entries = filesNames
    .map(name => `:${name.slice(0, name.lastIndexOf('.'))} rdf:type   mf:NegativeSyntaxTest11 ;
   dawgt:approval dawgt:Proposed ;
   mf:name    "${name}" ;
   mf:action  <${name}> .\n\n`)
    .join('');

console.log(
`@prefix :       <http://www.w3.org/2009/sparql/docs/tests/data-sparql11/syntax-query/manifest#> .
@prefix rdf:    <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix rdfs:   <http://www.w3.org/2000/01/rdf-schema#> .
@prefix mf:     <http://www.w3.org/2001/sw/DataAccess/tests/test-manifest#> .
@prefix mfx:    <http://jena.hpl.hp.com/2005/05/test-manifest-extra#> .
@prefix qt:     <http://www.w3.org/2001/sw/DataAccess/tests/test-query#> .
@prefix dawgt:  <http://www.w3.org/2001/sw/DataAccess/tests/test-dawg#> .

<>  rdf:type mf:Manifest ;
    rdfs:label "Negative Syntax Triple Terms" ;
    rdfs:comment "Negative syntax tests for triple terms in SPARQL 1.2" ;
    mf:entries
    (
${labels}
) .

${entries}
`);
