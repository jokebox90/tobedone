<?php

namespace App\Controller;

use App\Entity\Task;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TaskController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(ManagerRegistry $doctrine): Response
    {
        $currentUser = $this->getUser();
        $repository = $doctrine->getRepository( Task::class );
        $tasks = $repository->findByAuthor( $currentUser );
        return $this->render('task/index.html.twig', [
            'tasks' => $tasks,
            'username' => $currentUser->getUsername()
        ]);
    }

    #[Route('/new', name: 'app_new')]
    public function new(ManagerRegistry $doctrine): Response
    {
        return $this->render('task/new.html.twig', []);
    }
}
