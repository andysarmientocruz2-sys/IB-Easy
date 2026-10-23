import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

test('portable and deployed artifacts retain the complete original-project MIT notice',async()=>{
 const license=await readFile(new URL('../LICENSE',import.meta.url),'utf8');
 assert.match(license,/Permission is hereby granted/);
 for(const path of ['../dist/worker.js','../dist/IB-Easy-COAR.html']){
  const artifact=await readFile(new URL(path,import.meta.url),'utf8');
  assert.ok(artifact.includes(license),path+' must retain the license');
 }
 const pkg=JSON.parse(await readFile(new URL('../package.json',import.meta.url),'utf8'));
 assert.equal(pkg.license,'MIT');
});
