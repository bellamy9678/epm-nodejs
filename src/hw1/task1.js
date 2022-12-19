process.stdin.on('data', data => {
    const res = data.toString().split('').reverse().join('');
    process.stdout.write(res);
    console.log('\n');
})
