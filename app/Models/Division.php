<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Division extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'created_at',
        'updated_at',
    ];

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function polls()
    {
        return $this->hasMany(Poll::class);
    }

    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
